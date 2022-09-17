package Backend.Service.Implementation;

import Backend.Model.Cake;
import Backend.Model.Ingredient;
import Backend.Repository.CakeRepository;
import Backend.Service.CakeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CakeServiceImplementation implements CakeService {

    private final CakeRepository cakeRepository;

    public Cake readById(Long id) {
        Cake cake = cakeRepository.findFirstById(id);
        return cake;
    }

    @Override
    public List<Ingredient> getIngredientsByCakeId(Long id) {
        return cakeRepository.findFirstById(id).getIngredients();
    }

    @Override
    public List<Cake> getAll() {
        return (List<Cake>) cakeRepository.findAll();
    }

    @Override
    public Float getTotalPrice(List<Long> cakeIds) {
        List<Cake> cakeList = new ArrayList<>();

        for(int i=0;i<cakeIds.size();i++){
            Long id=cakeIds.get(i);
            Cake cake = cakeRepository.findFirstById(id);
            cakeList.add(cake);
        }
        Float suma;
        suma=0F;

        for(int i=0;i<cakeList.size();i++){
            Float price = cakeList.get(i).getPrice();
              suma=suma+price;
        }
        return suma;
    }

    @Override
    public Cake update(Cake cake) {
        Cake dbCake=cakeRepository.findFirstById(cake.getId());
        dbCake.setName(cake.getName());
        dbCake.setPrice(cake.getPrice());
        dbCake.setWeight(cake.getWeight());
        dbCake.setAmount(cake.getAmount());
        dbCake.setIngredients(cake.getIngredients());
        cakeRepository.save(dbCake);
        return dbCake;
    }
}





