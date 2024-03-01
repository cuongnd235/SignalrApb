using Microsoft.AspNetCore.Authorization;
using System;
using System.Threading.Tasks;
using Volo.Abp.AspNetCore.SignalR;

namespace Acme.BookStore.Hub
{
    //[Authorize]
    [HubRoute("/signalr-hubs")]
    public class WebMasterHub : AbpHub<IWebMasterHub>
    {
        public WebMasterHub() 
        {
        }

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

        public async Task GetCustomerAccess()
        {
            await this.Clients.Caller.OnGetCustomerAccess(1);
        }
    }
}
