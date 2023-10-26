<?php

namespace App\Repository;

use App\Entity\PlaylistCategory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PlaylistCategory>
 *
 * @method PlaylistCategory|null find($id, $lockMode = null, $lockVersion = null)
 * @method PlaylistCategory|null findOneBy(array $criteria, array $orderBy = null)
 * @method PlaylistCategory[]    findAll()
 * @method PlaylistCategory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PlaylistCategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PlaylistCategory::class);
    }

//    /**
//     * @return PlaylistCategory[] Returns an array of PlaylistCategory objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?PlaylistCategory
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
