package Backend.Service.Implementation;

import Backend.Model.Cake;
import Backend.Model.Ingredient;
import Backend.Repository.CakeRepository;
import Backend.Service.CakeService;
import Backend.Utils.CakeType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CakeServiceImplementation implements CakeService {

    private final CakeRepository cakeRepository;

    public Cake getById(UUID id) {
        Cake cake = cakeRepository.findFirstById(id);
        return cake;
    }

    @Override
    public List<Ingredient> getIngredientsByCakeId(UUID id) {
        Cake cake = cakeRepository.findFirstById(id);
        if (cake == null) {
            return new ArrayList<>();
        }
        return cakeRepository.findFirstById(id).getIngredients();
    }

    @Override
    public List<Cake> getAll() {
        return (List<Cake>) cakeRepository.findAll();
    }

    @Override
    public Float getTotalPrice(List<UUID> cakeIds) {
        List<Cake> cakeList = new ArrayList<>();

        for (int i = 0; i < cakeIds.size(); i++) {
            UUID id = cakeIds.get(i);
            Cake cake = cakeRepository.findFirstById(id);
            cakeList.add(cake);
        }
        Float suma;
        suma = 0F;

        for (int i = 0; i < cakeList.size(); i++) {
            Float price = cakeList.get(i).getPrice();
            suma = suma + price;
        }
        return suma;
    }

    @Override
    public void update(Cake cake) {
        Cake dbCake = cakeRepository.findFirstById(cake.getId());
        if (dbCake != null) {
            dbCake.setName(cake.getName());
            dbCake.setPrice(cake.getPrice());
            dbCake.setWeight(cake.getWeight());
            dbCake.setAmount(cake.getAmount());
            dbCake.setIngredients(cake.getIngredients());

            cakeRepository.save(dbCake);
        }
    }

    @Override
    public List<Cake> getByType(CakeType type) {
        if (type.ordinal() == -1)
            type = CakeType.Car;
        return cakeRepository.findAllByType(type);
    }

    @Override
    public List<Cake> getExpiredCakes() {
        List<Cake> cakeList = cakeRepository.findAllByExpirationDateBefore(LocalDateTime.now());
        if (cakeList == null) {
            return new ArrayList<>();
        }
        return cakeList;
    }

    @Override
    public void deleteCake(UUID id) {
        Cake cake = cakeRepository.findFirstById(id);
        if (cake != null) {
            cakeRepository.delete(cake);
        }
    }

    @Override
    public List<String> getCakeTypes() {
        List<String> cakeTypes = new ArrayList<>();

        for (CakeType type : CakeType.values()) {
            cakeTypes.add(type.name());
        }

        return cakeTypes;
    }

    @Override
    public Cake addCakeImage(UUID id, MultipartFile image) {
        byte[] imageCake = null;
        try {
            imageCake = image.getBytes();
            System.out.println(imageCake.length);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
        Cake cake = cakeRepository.findFirstById(id);
        if (cake == null) {
            return null;
        }
        cake.setImage(imageCake);
        cakeRepository.save(cake);
        return cake;
    }

    @Override
    public Cake addCake(Cake cake) {
        Cake newCake = new Cake(UUID.randomUUID(), cake.getName(), cake.getPrice(), cake.getWeight(), cake.getAmount(), cake.getIngredients(), cake.getType(), cake.getExpirationDate(), null);
        cakeRepository.save(newCake);
        return newCake;
    }
}
