<?php

namespace App\Repository;

use App\Entity\InfoCategory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<InfoCategory>
 *
 * @method InfoCategory|null find($id, $lockMode = null, $lockVersion = null)
 * @method InfoCategory|null findOneBy(array $criteria, array $orderBy = null)
 * @method InfoCategory[]    findAll()
 * @method InfoCategory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InfoCategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, InfoCategory::class);
    }

//    /**
//     * @return InfoCategory[] Returns an array of InfoCategory objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('i.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?InfoCategory
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
