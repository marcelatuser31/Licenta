package Backend.Repository;

import Backend.Model.Cake;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CakeRepository extends CrudRepository<Cake, Long> {
    Cake findFirstById(Long id);
}
