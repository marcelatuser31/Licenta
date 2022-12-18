package Backend.Repository;

import Backend.Model.Ingredient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IngredientRepository extends CrudRepository<Ingredient, Long> {
    Ingredient findFirstById(UUID id);
    Ingredient findFirstByName(String name);
}
