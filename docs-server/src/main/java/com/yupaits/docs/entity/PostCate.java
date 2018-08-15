package com.yupaits.docs.entity;

import com.yupaits.docs.common.base.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author yupaits
 * @date 2018/8/12
 */
@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "docs_post_cate")
public class PostCate extends BaseEntity<Long> {
    private static final long serialVersionUID = 1L;

    @Column(unique = true, nullable = false)
    private String cateName;
}
