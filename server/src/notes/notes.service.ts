import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(Note)
        private notesRepository: Repository<Note>,
    ) {}

    async create(createNoteDto: CreateNoteDto): Promise<Note> {
        const newNote = this.notesRepository.create(createNoteDto);
        return this.notesRepository.save(newNote);
    }

    async findAll(): Promise<Note[]> {
        return this.notesRepository.find();
    }

    async findOne(id: number): Promise<Note> {
        const note = await this.notesRepository.findOne({ where: { id } });
        if (!note) {
            throw new NotFoundException(`Note with ID ${id} not found`);
        }
        return note;
    }

    async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
        const note = await this.findOne(id);
        Object.assign(note, updateNoteDto);
        return this.notesRepository.save(note);
    }

    async remove(id: number): Promise<void> {
        const result = await this.notesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Note with ID ${id} was not found`);
        }
    }
}