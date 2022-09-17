package Backend.Repository;

import Backend.Model.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findAllById(Long id);
    List<Role> findAllByIdGreaterThan(Long id);
    List<Role> findAllByPassword(String password);
    Role findFirstByUsername(String username);

}






