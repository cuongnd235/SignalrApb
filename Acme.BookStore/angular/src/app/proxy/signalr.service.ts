import { EventEmitter, Injectable } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class SignalrService {

    private url = "https://localhost:44387/signalr-hubs";
    private defaultBusinessKey = "2334523234";
    private hubConnection: HubConnection;

    public readonly onConnectionStateChanged = new EventEmitter<any>();
    public onGetCustomerAccess = new EventEmitter<any>();
    public onFetchCustomerAccess = new EventEmitter<any>();
    public onGetBravoPushUsers = new EventEmitter<any>();
    public onFetchPushUser = new EventEmitter<any>();

    constructor(
        private oAuthService: OAuthService
    ) { }

    public async startAsync() {
        if (!this.hubConnection || this.hubConnection.state != HubConnectionState.Connected) {
            try {
                await this.createConnectionAsync();
                await this.hubConnection.start();
            } catch (error) {
                console.error(`Error while starting connection: ${error}`);
            }
        }
        // this.hubConnection.invoke('GetCustomerAccess', 'searchText');
    }

    private async createConnectionAsync() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(`${this.url}`, {
                transport: HttpTransportType.WebSockets,
                skipNegotiation: true,
                accessTokenFactory: () => this.oAuthService.getAccessToken()
            })
            .withAutomaticReconnect([0, 1000, 3000, 5000, 10000, 15000])
            .build();
        this.registerOnServerEvents();

    }

    public isConnected() {
        return this.hubConnection.state == HubConnectionState.Connected;
    }

    public async stopAsync() {
        if (this.hubConnection) {
            await this.hubConnection.stop();
            this.hubConnection = undefined;
        }
    }

    private registerOnServerEvents() {
        if (this.hubConnection == null)
            throw new Error("Push service is not initialized.");

        this.hubConnection.on('OnGetCustomerAccess', (customers: any) => {
            this.onGetCustomerAccess.emit(customers);
        })
    }

    public getCustomerAccess() {
        this.hubConnection.invoke('GetCustomerAccess');
    }
}
