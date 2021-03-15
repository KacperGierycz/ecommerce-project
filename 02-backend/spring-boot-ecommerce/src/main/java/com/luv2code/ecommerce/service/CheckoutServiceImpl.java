package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.entity.Order;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;


    public CheckoutServiceImpl(CustomerRepository customerRepository){
    this.customerRepository=customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        // tretrieve the order info from dto
        Order order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderItem

        // populate order with billingAddress and shippingAddress

        // populate customer with order

        // save to the database

        // return a response

        return null;

    }

    private String generateOrderTrackingNumber() {

        // generate a random UUID number (UUID version-4)
        // for details check: wiki universal unique identifier

        return UUID.randomUUID().toString();

    }
}




















