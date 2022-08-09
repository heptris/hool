package com.ssafy.hool;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hool.domain.member.QMember;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.UUID;

@SpringBootTest
@Transactional
class HoolApplicationTests {

	@Test
	void contextLoads() {

	}

}
