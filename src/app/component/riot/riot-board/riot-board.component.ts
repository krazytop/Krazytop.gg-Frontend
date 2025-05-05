import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RIOTSummonerService} from "../../../service/riot/riot-summoner.service";
import {RIOTBoardService} from "../../../service/riot/riot-board.service";
import {RIOTBoard} from "../../../model/riot/riot-board.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RIOTBoardSummoner} from "../../../model/riot/riot-board-summoner.model";
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {RIOTRankService} from "../../../service/riot/riot-rank.service";
import {RIOTMetadataService} from "../../../service/riot/riot-metadata.service";
import {RIOTMetadata} from "../../../model/riot/riot-metadata.model";
import {LOLMasteryService} from "../../../service/lol/lol-mastery.service";
import {RIOTImageService} from "../../../service/riot/riot-image.service";
import {RIOTPatchService} from "../../../service/riot/riot-patch.service";
import {LOLMatchService} from "../../../service/lol/lol-match.service";
import {LOLMatch} from "../../../model/lol/lol-match.model";
import {environment} from "../../../../environments/environment";
import {TimeService} from "../../../service/time.service";

@Component({
  selector: 'riot-board',
  templateUrl: './riot-board.component.html',
  styleUrls: ['./riot-board.component.css']
})
export class RiotBoardComponent implements OnInit {

  @ViewChild('addSummonerForm') addSummonerForm!: ElementRef;
  @ViewChild('boardNameInput') boardNameInput!: ElementRef;

  board?: RIOTBoard;
  summoners: RIOTBoardSummoner[] = [];
  isLOL: boolean = true;
  regions: string[] = ['EUW'];
  metadata?: RIOTMetadata;
  isEditing: boolean = false;
  componentIsReady: boolean = false;
  addSummonerLoading: boolean = false;
  roleImages = ['top', 'jungle', 'middle', 'bottom', 'support'];
  nextAllowedBoardUpdate: number = 0;
  boardUpdating = false;

  constructor(private route: ActivatedRoute, private summonerService: RIOTSummonerService, private boardService: RIOTBoardService,
              protected rankService: RIOTRankService, private metadataService: RIOTMetadataService, private masteryService: LOLMasteryService, protected imageService: RIOTImageService, private patchService: RIOTPatchService,
              protected matchService: LOLMatchService, protected timeService: TimeService, private router: Router) {
  }

  async ngOnInit() {
    const boardId = this.route.snapshot.paramMap.get('boardId')!;
    this.board = await this.boardService.getBoard(boardId, true);
    this.componentIsReady = true;
    if (this.board) {
      this.metadata = await this.metadataService.getMetadata();
      await this.patchService.checkAndGetNewLOLPatchIfNeeded(this.metadata!.currentPatch);
      this.nextAllowedBoardUpdate = this.timeService.getSecondsRemainingUntilNextAllowedUpdate(this.board!.updateDate!, environment.updateRIOTFrequency);
      setInterval(() => {
        this.nextAllowedBoardUpdate = this.timeService.getSecondsRemainingUntilNextAllowedUpdate(this.board!.updateDate!, environment.updateRIOTFrequency);
      }, 1000);
      for (const summonerId of this.board.summonerIds) {
        await this.retrieveSummonerData(await this.summonerService.getSummonerById(null, summonerId, true));
      }
    }
  }

  async retrieveSummonerData(summoner: RIOTSummoner | undefined) {//TODO changement de region = probleme
    if (summoner) {
      const boardSummoner: RIOTBoardSummoner = new RIOTBoardSummoner();
      boardSummoner.summoner = summoner;
      if (boardSummoner.summoner.updateDate){
        boardSummoner.ranks = await this.rankService.getRanks(summoner.id, this.isLOL);
        boardSummoner.masteries = (await this.masteryService.getMasteries(summoner.puuid)).champions.sort((a,b) => b.points - a.points).splice(0, 5);
        boardSummoner.matches = await this.matchService.getMatches(summoner.id, 0, 'all-queues', 'all-roles');
        boardSummoner.matches.push(...await this.matchService.getMatches(summoner.id, 1, 'all-queues', 'all-roles'))
        boardSummoner.matchesStreak = this.matchService.getMatchesStreak(boardSummoner.matches as LOLMatch[], boardSummoner.summoner);
        boardSummoner.matchesResults = this.matchService.getLatestMatchesResults(boardSummoner.matches as LOLMatch[], summoner);//TODO ajouter si j'en recup + de 20 (en boucle)
        boardSummoner.wins = this.getWinsNumber(boardSummoner.matchesResults);
        boardSummoner.losses = this.getLossesNumber(boardSummoner.matchesResults);
        boardSummoner.mainRoles = this.matchService.getRolesWinsAndLosses(boardSummoner.matches as LOLMatch[], boardSummoner.summoner);
        boardSummoner.maxPlayedRole = boardSummoner.mainRoles.reduce((sum, result) => sum + result[0] + result[1], 0);
      }
      this.summoners = this.summoners.filter(summoner => summoner.summoner.id !== boardSummoner.summoner.id);
      this.summoners.push(boardSummoner);
    } else {
      //TODO erreur lorsqu'il n est pas retrouvé
    }
  }

  async addSummoner(region: string, tag: string | undefined, name: string) {
    this.addSummonerLoading = true;
    if (!tag) tag = 'EUW';
    if (name) {
      const newSummoner = await this.boardService.addSummonerToBoard(this.board!.id, region, tag, name, this.isLOL);
      if (newSummoner) {
        this.board?.summonerIds.push(newSummoner.id);
        await this.retrieveSummonerData(newSummoner);
        this.addSummonerForm.nativeElement.reset();
      }
    }
    this.addSummonerLoading = false;
  }

  async importSummoner(boardSummoner: RIOTBoardSummoner) {
    boardSummoner.isImporting = true;
    this.isLOL ? await this.summonerService.updateLOLData(boardSummoner.summoner!.region, boardSummoner.summoner!.puuid, boardSummoner.summoner!.id)
      : await this.summonerService.updateTFTData(boardSummoner.summoner!.region, boardSummoner.summoner!.puuid, boardSummoner.summoner!.id);
    await this.retrieveSummonerData(await this.summonerService.getSummonerById(null, boardSummoner.summoner.id, true));
  }

  async removeSummoner(boardSummoner: RIOTBoardSummoner) {
    if (!boardSummoner.isRemoving) {
      boardSummoner.isRemoving = true;
      await this.boardService.removeSummonerOfBoard(this.board!.id, boardSummoner.summoner.id, this.isLOL);
      this.summoners = this.summoners.filter(sum => sum.summoner.id !== boardSummoner.summoner.id);
      this.board!.summonerIds = this.board!.summonerIds.filter(summonerId => summonerId !== boardSummoner.summoner.id);
    }
  }

  getAllMetadataRanks() {
    return this.metadata?.allRanks.filter(rank => this.isLOL ? rank.isLOL : !rank.isLOL);
  }

  getWinsNumber(results: string[]) {
    return results.filter(result => result === 'VICTORY').length;
  }

  getLossesNumber(results: string[]) {
    return results.filter(result => result === 'DEFEAT').length;
  }

  async updateBoard() {
    this.boardUpdating = true;
    await this.boardService.updateBoardSummoners(this.board!.id, this.isLOL);
    window.location.reload();
  }

  async deleteBoard() {
    if (confirm('Are you sure you want to delete this board ?')) {
      await this.boardService.deleteBoard(this.board!.id, this.isLOL);
      this.router.navigate(['/']);
    }
  }

  async toggleEditing() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      const newName = this.boardNameInput.nativeElement.value;
      if (this.board!.name !== newName) {
        const oldName = this.board!.name;
        this.board!.name = newName;
        if (!await this.boardService.updateBoardName(this.board!.id, newName, this.isLOL)) {
          this.board!.name = oldName;
        }
      }
    }
  }

  range(n: number): number[] {
    return Array(n).fill(0).map((_, i) => i);
  }

  protected readonly Date = Date;
  protected readonly Math = Math;
}
