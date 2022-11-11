import graphene
from .schema_mutations import Mutation
from .schema_queries import Query


schema = graphene.Schema(query=Query, mutation=Mutation)
