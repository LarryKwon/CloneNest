import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../entity/board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { BoardStatus } from '../boards-status.enum';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoarDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoarDto;
    const board = this.create({
      title: title,
      description: description,
      status: BoardStatus.PUBLIC,
    });
    await this.save(board);
    console.log(board);
    return board;
  }
}
