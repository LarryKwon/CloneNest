import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entity/board.entity';
import { BoardRepository } from './repository/board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';

@Injectable()
export class BoardsService {
  // private boards = new Array<Board>();
  constructor(
    @InjectRepository(BoardRepository)
    private readonly boardRepository: BoardRepository,
  ) {}

  // getAllBoards(): Array<Board> {
  //   return this.boards;
  // }
  //
  async getAllBoards(): Promise<Array<Board>> {
    return await this.boardRepository.find();
  }
  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const { title, description } = createBoardDto;
  //
  //   const board: Board = {
  //     id: uuid(),
  //     title: title,
  //     description: description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }

  async createBoard(createBoarDto: CreateBoardDto): Promise<Board> {
    return await this.boardRepository.createBoard(createBoarDto);
  }

  // getBoardById(id: string): Board {
  //   const board = this.boards.find((board) => {
  //     return board.id === id;
  //   });
  //   if (!board) {
  //     throw new NotFoundException(`can't find board with id ${id}`);
  //   }
  //   return board;
  // }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }
  //
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => {
  //     return board.id !== found.id;
  //   });
  // }

  async deleteBoard(id: number): Promise<UpdateResult> {
    const found = this.getBoardById(id);
    return await this.boardRepository.softDelete(id);
  }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }

  async updateBoardStatus(
    id: number,
    status: BoardStatus,
  ): Promise<UpdateResult> {
    const found = await this.getBoardById(id);
    return await this.boardRepository.update(id, { status: status });
  }
}
