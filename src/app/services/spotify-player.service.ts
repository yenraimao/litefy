import { ServiceBase } from './service.base';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpotifyPlayerService {

    constructor(private service: ServiceBase) { }

    deviceIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    playerStatusSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    setPlayerStatus(status: any) {
        this.playerStatusSubject.next(status);
    }

    getPlayerStatus() {
        return this.playerStatusSubject.asObservable();
    }

    setDeviceId(device_id: string) {
        this.deviceIdSubject.next(device_id);
    }

    getDeviceId() {
        return this.deviceIdSubject.asObservable();
    }

    transferPlayback(device_id: string) {
        return this.service.Put('https://api.spotify.com/v1/me/player', {
            device_ids: [device_id],
            play: false
        });
    }

    recentes() {
        return this.service.Get<any>('https://api.spotify.com/v1/me/player/recently-played?limit=1');
        //   .subscribe(item => {
        //     this.play(item.items[0].track.uri);
        //   });
    }

    add(uri: string, device_id: string) {
        return this.service.Post('https://api.spotify.com/v1/me/player/queue?device_id=' + device_id + '&uri=' + uri, {});
        //   .subscribe(item => {
        //     console.log('Added!');
        //   });
    }

    play(device_id: string, content: string = null, lista: string[] = null) {
        let model: any = {};

        if(lista != null) {
            model['uris'] = lista;
        }
        else {
            if (content != null) {
                model['uris'] = [content];
            }
        }


        return this.service.Put('https://api.spotify.com/v1/me/player/play?device_id=' + device_id, JSON.stringify(model));
    }

    pause(device_id: string) {
        return this.service.Put('https://api.spotify.com/v1/me/player/pause?device_id=' + device_id, {});
    }

    next(device_id: string) {
        return this.service.Post('https://api.spotify.com/v1/me/player/next?device_id=' + device_id, {});
    }

    previous(device_id: string) {
        return this.service.Post('https://api.spotify.com/v1/me/player/previous?device_id=' + device_id, {});
    }

    getCurrentState() {
        return this.service.Get('https://api.spotify.com/v1/me/player');
    }

    getAlbumTracks(id) {
        return this.service.Get<any>(`https://api.spotify.com/v1/albums/${id}/tracks`);
    }

    seekToPosition(device_id: string, ms: number) {
        return this.service.Put<any>(`https://api.spotify.com/v1/me/player/seek?device_id=${device_id}&position_ms=${ms}`, null);
    }
}