package Backend.Service;

import Backend.DTO.OrderDTO;
import Backend.DTO.OrderResponseDTO;
import Backend.Model.Order;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public interface OrderService {
    Order readById(UUID id);
    OrderResponseDTO addOrder(OrderDTO orderDTO);
    Order update(Order order);
    void cancelOrder(UUID id);
}