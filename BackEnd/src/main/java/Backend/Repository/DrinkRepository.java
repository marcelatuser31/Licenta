package Backend.Repository;

import Backend.Model.Drink;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrinkRepository extends CrudRepository<Drink, Long> {
    Drink findFirstById(Long id);
}
