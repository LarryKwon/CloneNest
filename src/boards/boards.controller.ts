import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './entity/board.entity';
import { UpdateResult } from 'typeorm';

@Controller('/boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Get()
  getAllBoard(): Promise<Array<Board>> {
    return this.boardService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    const createdBoard: Promise<Board> =
      this.boardService.createBoard(createBoardDto);
    console.log(createdBoard);
    return createdBoard;
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: number): Promise<UpdateResult> {
    return this.boardService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoard(
    @Param('id') id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<UpdateResult> {
    return this.boardService.updateBoardStatus(id, status);
  }
}
