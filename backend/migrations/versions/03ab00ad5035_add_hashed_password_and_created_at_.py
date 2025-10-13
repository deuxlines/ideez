"""add hashed password and created at fields. make google id nullable

Revision ID: 03ab00ad5035
Revises: 797699fb3989
Create Date: 2025-10-13 11:28:38.225674

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '03ab00ad5035'
down_revision: Union[str, Sequence[str], None] = '797699fb3989'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
