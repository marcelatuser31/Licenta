package Backend.Service;

import Backend.Model.Ingredient;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public interface IngredientService {
    Ingredient getById(UUID id);
    Ingredient getByName(String name);
    Ingredient update(Ingredient ingredient);
    void insert(String ingredientName);
}
