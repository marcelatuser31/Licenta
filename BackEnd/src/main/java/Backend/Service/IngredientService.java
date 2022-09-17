package Backend.Service;

import Backend.Model.Ingredient;
import org.springframework.stereotype.Component;

@Component
public interface IngredientService {
    Ingredient readById(Long id);
    Ingredient readByName(String name);
    Ingredient update(Ingredient ingredient);
}
