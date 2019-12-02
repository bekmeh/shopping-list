package com.bekmeh.shopping.list;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "list_items")
public class ListItem {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Double price;

    @NotNull
    private Integer orderIndex;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NotNull
    public String getName() {
        return name;
    }

    public void setName(@NotNull String name) {
        this.name = name;
    }

    @NotNull
    public Double getPrice() {
        return price;
    }

    public void setPrice(@NotNull Double price) {
        this.price = price;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(@NotNull Integer orderIndex) {
        this.orderIndex = orderIndex;
    }
}
