package br.com.despensa.produto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
@RestController @RequestMapping("/api/produtos")
public class ProdutoController {
  private final ProdutoRepository repository;
  public ProdutoController(ProdutoRepository repository){this.repository=repository;}
  @GetMapping public List<Produto> listar(@RequestParam Long despensaId){return repository.findByDespensaIdOrderByNomeAsc(despensaId);}
  @PostMapping @ResponseStatus(HttpStatus.CREATED)
  public Produto criar(@Valid @RequestBody ProdutoRequest r){return repository.save(new Produto(r.nome(),r.descricao(),r.despensaId(),r.categoriaId(),r.unidade(),r.estoqueMinimo()));}
  @GetMapping("/{id}") public Produto buscar(@PathVariable Long id){return repository.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Produto não encontrado"));}
  public record ProdutoRequest(@NotBlank @Size(max=140) String nome,@Size(max=500) String descricao,@NotNull @Positive Long despensaId,Long categoriaId,@NotBlank @Size(max=20) String unidade,@NotNull @DecimalMin("0.0") BigDecimal estoqueMinimo){}
}
