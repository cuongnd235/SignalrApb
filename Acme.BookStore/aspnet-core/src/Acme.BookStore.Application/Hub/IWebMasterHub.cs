using System.Threading.Tasks;

namespace Acme.BookStore.Hub
{
    public interface IWebMasterHub
    {
        Task OnGetCustomerAccess(object pCustomerAccess);
        void OnFetchPushUser(object pBravoPushUser, bool pIsStopCalled);

    }
}
