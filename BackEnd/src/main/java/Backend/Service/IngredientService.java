package Backend.Service;

import Backend.Model.Ingredient;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public interface IngredientService {
    Ingredient getById(UUID id);
    Ingredient getByName(String name);
    Ingredient update(Ingredient ingredient);
    void insert(Ingredient ingredient);
    List<Ingredient> getAll();
}
