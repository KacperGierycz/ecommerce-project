package com.luv2code.ecommerce.config;

import com.luv2code.ecommerce.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Value("${allowed.origins}")
    private String[] theAllowedOrigins;

    private EntityManager entitityMenager;

    @Autowired MyDataRestConfig(EntityManager theEntityManager){
        entitityMenager=theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] theUnsupportedActions={HttpMethod.PUT,
                HttpMethod.POST ,HttpMethod.DELETE, HttpMethod.PATCH};


        // disable methods for ProductCategory: PUT, POST, DELETE
        disableHttpMethods(Product.class, config, theUnsupportedActions);
        disableHttpMethods(ProductCategory.class, config, theUnsupportedActions);
        disableHttpMethods(Country.class, config, theUnsupportedActions);
        disableHttpMethods(State.class, config, theUnsupportedActions);
        disableHttpMethods(Order.class, config, theUnsupportedActions);

        // call the internal helper method
         exposeIds(config);

         // configure cors mapping
        cors.addMapping(config.getBasePath()  + "/**").allowedOrigins(theAllowedOrigins);

    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        // expose entity ids
        //

        // -get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities=entitityMenager.getMetamodel().getEntities();

        // create a array list of the entity types
        List<Class> entityClasses= new ArrayList<>();

        // get the entitys type from the Entitys
        for ( EntityType tempEntityType : entities){
        entityClasses.add(tempEntityType.getJavaType());
        }

        // expose the entity ids for the array of entity types
        Class[] domainTypes=entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);


    }



}
