import { Injectable } from "@nestjs/common";
import { OutboxEntity } from "src/domain/outbox/outbox.entity";
import { DataSource, Not, Repository } from "typeorm";

@Injectable()
export class OutboxRepository extends Repository<OutboxEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(OutboxEntity, dataSource.createEntityManager());
    }

    async createEntry(body: Partial<OutboxEntity>) {
        const entry = this.create(body);
        return await this.save(entry);
    }
}