package Backend.Repository;

import Backend.Model.Cake;
import Backend.Utils.CakeType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface CakeRepository extends CrudRepository<Cake, Long> {
    Cake findFirstById(UUID id);
    List<Cake> findAllByExpirationDateBefore(LocalDateTime localDateTime);
    List<Cake> findAllByType(CakeType type);
}