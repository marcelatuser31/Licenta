package Backend.Service.Implementation;

import Backend.Model.Ingredient;
import Backend.Repository.IngredientRepository;
import Backend.Service.IngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class IngredientServiceImplementation implements IngredientService {
    private final IngredientRepository ingredientRepository;

    @Override
    public Ingredient getById(UUID id) {
        return ingredientRepository.findFirstById(id);
    }

    @Override
    public Ingredient getByName(String name) {
        return ingredientRepository.findFirstByName(name);
    }

    @Override
    public Ingredient update(Ingredient ingredient) {
        Ingredient dbIngredient = ingredientRepository.findFirstById(ingredient.getId());
        if (dbIngredient == null)
            return null;

        dbIngredient.setName(ingredient.getName());
        ingredientRepository.save(dbIngredient);
        return dbIngredient;
    }

    public void insert(Ingredient ingredient) {
        UUID uid = UUID.randomUUID();
        Ingredient newIngredient = new Ingredient(uid, ingredient.getName());
        ingredientRepository.save(newIngredient);
    }

    @Override
    public List<Ingredient> getAll() {
        return (List<Ingredient>) ingredientRepository.findAll();
    }
}