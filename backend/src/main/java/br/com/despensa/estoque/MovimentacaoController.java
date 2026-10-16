package br.com.despensa.estoque;
import br.com.despensa.produto.Produto;
import br.com.despensa.produto.ProdutoRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/movimentacoes")
public class MovimentacaoController {
  private final MovimentacaoRepository repository;
  private final ProdutoRepository produtoRepository;
  public MovimentacaoController(MovimentacaoRepository repository, ProdutoRepository produtoRepository) {
    this.repository=repository; this.produtoRepository=produtoRepository;
  }

  @GetMapping
  public List<MovimentacaoEstoque> listar(@RequestParam Long produtoId) {
    return repository.findByProdutoIdOrderByCriadoEmDesc(produtoId);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public MovimentacaoEstoque criar(@Valid @RequestBody MovimentacaoRequest request) {
    if (!produtoRepository.existsById(request.produtoId())) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
    }
    return repository.save(new MovimentacaoEstoque(request.produtoId(), request.tipo(),
      request.quantidade(), request.observacao(), request.criadoPor()));
  }

  public record MovimentacaoRequest(@NotNull @Positive Long produtoId,
      @NotNull MovimentacaoTipo tipo, @NotNull @DecimalMin(value="0.001") BigDecimal quantidade,
      @Size(max=300) String observacao, @Positive Long criadoPor) {}
}
