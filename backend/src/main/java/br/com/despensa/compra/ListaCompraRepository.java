package br.com.despensa.compra;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ListaCompraRepository extends JpaRepository<ItemListaCompra, Long> {
  List<ItemListaCompra> findByDespensaIdOrderByCompradoAscCriadoEmDesc(Long despensaId);
}
