import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './note.entity';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Post()
    create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
        return this.notesService.create(createNoteDto);
    }

    @Get()
    findAll(): Promise<Note[]> {
        return this.notesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Note> {
        return this.notesService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto): Promise<Note> {
        return this.notesService.update(+id, updateNoteDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string): Promise<void> {
        return this.notesService.remove(+id);
    }
}
