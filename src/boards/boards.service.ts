import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardsService {
  // private boards = new Array<Board>();

  getAllBoards(): Array<Board> {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;

    const board: Board = {
      id: uuid(),
      title: title,
      description: description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const board = this.boards.find((board) => {
      return board.id === id;
    });
    if (!board) {
      throw new NotFoundException(`can't find board with id ${id}`);
    }
    return board;
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => {
      return board.id !== found.id;
    });
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
