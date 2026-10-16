package br.com.despensa.lote;
import br.com.despensa.produto.ProdutoRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/lotes")
public class LoteController {
  private final LoteRepository repository;
  private final ProdutoRepository produtoRepository;
  public LoteController(LoteRepository repository, ProdutoRepository produtoRepository) {
    this.repository=repository; this.produtoRepository=produtoRepository;
  }

  @GetMapping
  public List<LoteProduto> listar(@RequestParam(required=false) Long produtoId,
                                  @RequestParam(required=false) Integer vencendoEmDias) {
    if (produtoId != null) return repository.findByProdutoIdOrderByDataValidadeAsc(produtoId);
    if (vencendoEmDias != null) return repository.findByDataValidadeLessThanEqualOrderByDataValidadeAsc(LocalDate.now().plusDays(Math.max(0, vencendoEmDias)));
    return repository.findAll();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public LoteProduto criar(@Valid @RequestBody LoteRequest request) {
    if (!produtoRepository.existsById(request.produtoId())) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
    }
    return repository.save(new LoteProduto(request.produtoId(), request.quantidade(), request.dataValidade(), request.localizacao()));
  }

  public record LoteRequest(@NotNull @Positive Long produtoId,
      @NotNull @DecimalMin("0.001") BigDecimal quantidade, LocalDate dataValidade,
      @Size(max=120) String localizacao) {}
}
