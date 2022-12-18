package Backend.Repository;

import Backend.Model.Drink;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DrinkRepository extends CrudRepository<Drink, Long> {
    Drink findFirstById(UUID id);
}
