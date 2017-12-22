import { Component, OnInit } from '@angular/core';
import { Broadcaster } from '../../shared/myEmittor.service';

@Component({
    templateUrl: './boxChat.component.html',
    selector: 'box-chat',
    styleUrls: ['./boxChat.component.scss']
})

export class BoxChatComponent implements OnInit {
    message = '';
    listMessage = [];
    botMess = [];
    constructor(private broadcaster: Broadcaster) { }

    ngOnInit() {
        this.broadcaster.on<any>('botChat').subscribe(value => {
            this.botMess.push(value);
        })
    }

    onKey(value: string) {
        this.message += value;
    }

    send() {
        if (this.message !== '') {
            this.listMessage.push(this.message);
            this.broadcaster.broadcast('userChat', this.message);
        }
        this.message = '';
    }
}