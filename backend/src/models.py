from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class UserProfile(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, unique=True, index=True)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    first_name = Column(String, nullable=False, default='')
    weight = Column(Integer, nullable=False)
    height = Column(Integer, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    dob = Column(Date, nullable=False)
    last_name = Column(String, nullable=True)

    login_id = Column(Integer, ForeignKey("login.id"))
    login = relationship("Login", back_populates="users")
