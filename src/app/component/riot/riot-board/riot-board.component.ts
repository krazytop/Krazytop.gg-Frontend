import {Component, OnInit} from '@angular/core';
import {RIOTSummonerService} from "../../../service/riot/riot-summoner.service";
import {RIOTBoardService} from "../../../service/riot/riot-board.service";
import {RIOTBoard} from "../../../model/riot/riot-board.model";
import {ActivatedRoute} from "@angular/router";
import {RIOTBoardSummoner} from "../../../model/riot/riot-board-summoner.model";
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {RIOTRankService} from "../../../service/riot/riot-rank.service";
import {RIOTMetadataService} from "../../../service/riot/riot-metadata.service";
import {RIOTMetadata} from "../../../model/riot/riot-metadata.model";
import {LOLMasteryService} from "../../../service/lol/lol-mastery.service";
import {RIOTImageService} from "../../../service/riot/riot-image.service";
import {RIOTPatchService} from "../../../service/riot/riot-patch.service";
import {LOLMatchService} from "../../../service/lol/lol-match.service";
import {RIOTMatch} from "../../../model/riot/riot-match.model";
import {LOLMatch} from "../../../model/lol/lol-match.model";

@Component({
  selector: 'app-riot-board',
  templateUrl: './riot-board.component.html',
  styleUrls: ['./riot-board.component.css']
})
export class RiotBoardComponent implements OnInit {

  board?: RIOTBoard;
  summoners: RIOTBoardSummoner[] = [];
  isLOL: boolean = true;
  regions: string[] = ['EUW'];
  metadata?: RIOTMetadata;

  constructor(private route: ActivatedRoute, private summonerService: RIOTSummonerService, private boardService: RIOTBoardService,
              protected rankService: RIOTRankService, private metadataService: RIOTMetadataService, private masteryService: LOLMasteryService, protected imageService: RIOTImageService, private patchService: RIOTPatchService,
              protected matchService: LOLMatchService) {
  }

  async ngOnInit() {
    const boardId = this.route.snapshot.paramMap.get('boardId')!;
    this.board = await this.boardService.getBoard(boardId, true);
    if (this.board) {
      for (const summonerId of this.board.summonerIds) {
        const summoner = await this.summonerService.getSummonerById("region", summonerId, true);
        this.metadata = await this.metadataService.getMetadata();
        await this.patchService.checkAndGetNewLOLPatchIfNeeded(this.metadata!.currentPatch);
        await this.retrieveSummonerData(summoner);
      }
    }
  }

  async retrieveSummonerData(summoner: RIOTSummoner | undefined) {//TODO changement de region = probleme
    if (summoner) {
      const boardSummoner: RIOTBoardSummoner = new RIOTBoardSummoner();
      boardSummoner.summoner = summoner;
      if (boardSummoner.summoner.updateDate){
        boardSummoner.ranks = await this.rankService.getRanks(summoner.id, this.isLOL);
        boardSummoner.masteries = (await this.masteryService.getMasteries(summoner.puuid)).champions.sort((a,b) => b.points - a.points).splice(0, 3);
        const newMatches = await this.matchService.getMatches(summoner.id, 0, 'all-queues', 'all-roles');
        boardSummoner.matches = newMatches;
        //TODO matches ...
      }
      this.summoners.push(boardSummoner);//TODO replace si existant
    } else {
      //TODO erreur lorsqu'il n est pas retrouvé
    }
  }

  async addSummoner(region: string, tag: string | undefined, name: string) {
    if (!tag) {
      tag = 'EUW';
    }
    if (name) {
      const newSummoner = await this.boardService.addSummonerToBoard(this.board!.id, region, tag, name, this.isLOL);
      await this.retrieveSummonerData(newSummoner);
    }
  }

  async importSummoner(summoner: RIOTSummoner) {

  }

  async removeSummoner(summonerId: string) {
    await this.boardService.removeSummonerOfBoard(this.board!.id, summonerId, this.isLOL);
    this.summoners = this.summoners.filter(sum => sum.summoner.id !== summonerId);
  }

  getAllMetadataRanks() {
    return this.metadata?.allRanks.filter(rank => this.isLOL ? rank.isLOL : !rank.isLOL);
  }

  getWinsAndLosses(matches: RIOTMatch[], summoner: RIOTSummoner) {
    return this.matchService.getWinsAndLosses(matches as LOLMatch[], summoner);
  }
}
