using ControleAPI.Models;
using ControleAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DespesasController : ControllerBase
    {
        private readonly IDespesasRepository _despesasRepository;
        public DespesasController(IDespesasRepository despesasRepository)
        {
            _despesasRepository = despesasRepository;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAllDespesas()
        {
            var despesas = await _despesasRepository.GetAllDespesasAsync();
            return Ok(despesas);
        }
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetDespesaById(int id)
        {
            var despesa = await _despesasRepository.GetDespesaByIdAsync(id);
            if (despesa == null)
                return NotFound(new { Message = "Despesa não encontrada." });
            return Ok(despesa);
        }

        [HttpPost]
        public async Task<ActionResult<Despesas>> PostDespesa(Despesas despesa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var novaDespesa = await _despesasRepository.AddDespesaAsync(despesa);

            return CreatedAtAction(nameof(GetAllDespesas), new { id = novaDespesa.Id }, novaDespesa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDespesa(int id, Despesas despesa)
        {
            if (id != despesa.Id)
            {
                return BadRequest("O ID da URL é diferente do ID do corpo da requisição.");
            }

            try
            {
                await _despesasRepository.UpdateDespesaAsync(despesa);
            }
            catch (Exception)
            {
                var existe = await _despesasRepository.GetDespesaByIdAsync(id);
                if (existe == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
    }
}
