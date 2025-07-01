# Используем официальный образ PostgreSQL
FROM postgres:15-alpine

# Переменные окружения для инициализации БД
ENV POSTGRES_DB=m_db
ENV POSTGRES_USER=m_admin
ENV POSTGRES_PASSWORD=m_12345678

# Копируем SQL-скрипты для инициализации
COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Экспортируем порт PostgreSQL
EXPOSE 5432

# Health check для мониторинга состояния БД
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB