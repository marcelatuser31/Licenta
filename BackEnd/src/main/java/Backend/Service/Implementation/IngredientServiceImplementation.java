package Backend.Service.Implementation;

import Backend.Model.Ingredient;
import Backend.Repository.IngredientRepository;
import Backend.Service.IngredientService;
import io.swagger.models.auth.In;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IngredientServiceImplementation implements IngredientService {
    private final IngredientRepository ingredientRepository;

    @Override
    public Ingredient getById(Long id) {
        return ingredientRepository.findFirstById(id);
    }

    @Override
    public Ingredient getByName(String name) {
        Ingredient ingredient=ingredientRepository.findFirstByName(name);
        return ingredientRepository.findFirstByName(name);
    }

    @Override
    public Ingredient update(Ingredient ingredient) {
        Ingredient dbIngredient=ingredientRepository.findFirstById(ingredient.getId());

        dbIngredient.setName(ingredient.getName());
        ingredientRepository.save(dbIngredient);
        return dbIngredient;
    }

    public void insert(String name) {
        Ingredient ingredient = new Ingredient(null,name);
        ingredientRepository.save(ingredient);
    }
}
