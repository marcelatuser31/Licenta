package Backend.Repository;

import Backend.Model.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findAllById(UUID id);
    Role findFirstByUsername(String username);
}