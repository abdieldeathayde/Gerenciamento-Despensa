package br.com.despensa.estoque;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
public interface MovimentacaoRepository extends JpaRepository<MovimentacaoEstoque, Long> {
  List<MovimentacaoEstoque> findByProdutoIdOrderByCriadoEmDesc(Long produtoId);
}
