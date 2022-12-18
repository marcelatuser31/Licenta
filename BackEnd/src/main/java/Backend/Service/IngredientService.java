package Backend.Service;

import Backend.Model.Ingredient;
import org.springframework.stereotype.Component;

@Component
public interface IngredientService {
    Ingredient getById(Long id);
    Ingredient getByName(String name);
    Ingredient update(Ingredient ingredient);

    void insert(String ingredientName);
}
