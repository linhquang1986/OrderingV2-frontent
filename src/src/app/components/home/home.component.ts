import { Component, OnInit } from '@angular/core';
import { IWindow } from '../../models/speedRecognize';
import { WitService } from '../../shared/wit.service';
import { HandleResultWitAi } from '../../shared/witResult.service';
import { AppState } from '../../reduxStore/initStore';
import { NgRedux } from 'ng2-redux';
import { Broadcaster } from '../../shared/myEmittor.service';
import { WebsocketService } from '../../shared/webSocket.service';

const { webkitSpeechRecognition }: IWindow = <IWindow>window;

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recognition = null;
  connectGoogle;
  constructor(
    private witService: WitService,
    private handleRsWit: HandleResultWitAi,
    private ngRedux: NgRedux<AppState>,
    private broadcaster: Broadcaster,
    private webSocket: WebsocketService
  ) {
    // Do stuff
  }

  start() {
    let that = this;
    try {
      if (this.recognition)
        this.recognition = null;
      this.recognition = new webkitSpeechRecognition();
      this.recognition.lang = 'vi-VN';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
      this.recognition.start();

      this.recognition.onresult = function (event) {
        let text = event.results[0][0].transcript;
        console.log(text)
        if (!that.ngRedux.getState().noteBill)
          that.sendWitAi(text)
        else
          that.addNoteBill(text)
        // if (!noteBill) {
        //   //userChat(text);
        //   //sendWitAi(text)
        // } else {
        //   //addNoteBill(msg)
        // }
        // // if (text == 'Doraemon' || text == 'doraemon') {
        // //   isListen = true;
        // //   responsiveVoice.speak("Bạn muốn tôi giúp gì", "Vietnamese Male", {
        // //     onend: () => {
        // //       connectSocket();
        // //       //startRecording();
        // //     }
        // //   });
        // // }
      };
      this.recognition.onend = () => {
        console.log('end')
        if (!this.connectGoogle)
          this.start();
        // if (!isListen)
        //   this.start();
      }
      this.recognition.onerror = function (event) {
        if (event.error == 'no-speech') {
          console.log('No speech was detected. Try again.')
          // if (billData.length > 0 && userAs == false) {
          //   userAs = true;
          //   speak('Bạn còn muốn gọi thêm gì nữa không?')
          // }
        };
      }
    }
    catch (e) {
      console.error('Brower is not support!');
    }
  }

  bestDrink() {
    this.handleRsWit.showListSpecial()
  }

  sendWitAi(text) {
    this.witService.sendWit(text).then(data => {
      this.handleRsWit.checkEntities(data.entities)
    })
  }

  addNoteBill(text) {
    this.ngRedux.dispatch({ type: 'addNoteText', data: text });
  }

  connect() {
    if (!this.connectGoogle) {
      this.connectGoogle = true;
      this.recognition.abort()
      this.webSocket.connect();
    }
  }

  ngOnInit() {
    this.start();
    this.connectGoogle = false;
    this.broadcaster.on<any>('userChat').subscribe(value => {
      this.sendWitAi(value);
    })
  }

}
