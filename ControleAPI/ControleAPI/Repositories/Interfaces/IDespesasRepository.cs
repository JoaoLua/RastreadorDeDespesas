using ControleAPI.Models;

namespace ControleAPI.Repositories.Interfaces
{
    public interface IDespesasRepository
    {
        Task<IEnumerable<Despesas>> GetAllDespesasAsync();
        Task<Despesas?> GetDespesaByIdAsync(int id);
        Task<Despesas> AddDespesaAsync(Despesas despesa);
        Task<Despesas?> UpdateDespesaAsync(Despesas despesa);
        Task<bool> DeleteDespesaAsync(int id);
    }
}
