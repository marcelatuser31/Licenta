package Backend.Repository;

import Backend.Model.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {
    Order findFirstById(UUID id);
}
