package com.bekmeh.shopping.list;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * ListItem entity, representing an item on the shopping list. In the JSON response, these will be ordered by the
 * 'orderIndex' field.
 */
@Entity
@Table(name = "list_items")
public class ListItem {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @NotNull
    private String name;

    @NotNull
    private Double price;

    @NotNull
    private Integer orderIndex;

    private boolean complete;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public boolean isComplete() {
        return complete;
    }

    public void setComplete(boolean complete) {
        this.complete = complete;
    }
}
