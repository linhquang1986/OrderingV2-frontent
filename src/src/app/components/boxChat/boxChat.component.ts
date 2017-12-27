import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Broadcaster } from '../../shared/myEmittor.service';
declare var $: any;

@Component({
    templateUrl: './boxChat.component.html',
    selector: 'box-chat',
    styleUrls: ['./boxChat.component.scss']
})

export class BoxChatComponent implements AfterViewInit {
    @ViewChild("box_chat", { read: ElementRef }) box_chat: ElementRef;
    message = '';
    constructor(private broadcaster: Broadcaster) { }

    ngAfterViewInit() {
        this.broadcaster.on<any>('botChat').subscribe(value => {
            let contai = `<li class="left clearfix">
                            <span class="chat-img pull-left">
                                <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" />
                            </span>
                            <div class="chat-body clearfix">
                                <p style="text-align: left">
                                ${value}
                                </p>
                            </div>
                        </li>`;
            this.appendMess(contai);
        })
    }

    onKey(value: string) {
        this.message += value;
    }

    send() {
        if (this.message !== '') {
            let contai = `<li class="right clearfix">
                            <span class="chat-img pull-right">
                                <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" />
                            </span>
                            <div class="chat-body clearfix">
                                <p style="text-align: right">
                                ${this.message}
                                </p>
                            </div>
                        </li>`;
            this.appendMess(contai);
            this.broadcaster.broadcast('userChat', this.message);
        }
        this.message = '';
    }

    appendMess(contai) {
        $(this.box_chat.nativeElement).append(contai);
        $(".panel-chatbox").scrollTop($(".panel-chatbox").prop("scrollHeight"));
    }
}