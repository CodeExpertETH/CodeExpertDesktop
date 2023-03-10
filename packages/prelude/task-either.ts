import { either, io } from 'fp-ts';
import * as Ap from 'fp-ts/Apply';
import * as Ei from 'fp-ts/Either';
import * as RA from 'fp-ts/ReadonlyArray';
import * as TE from 'fp-ts/TaskEither';
import { TaskEither } from 'fp-ts/TaskEither';
import { FunctionN, constFalse, flow, identity, pipe } from 'fp-ts/function';

import * as eitherT from './eithert';
import * as functor from './functor';
import * as task from './task';

export * from 'fp-ts/TaskEither';

export const sequenceS = Ap.sequenceS(TE.ApplyPar);

export const sequenceT = Ap.sequenceT(TE.ApplyPar);

export const traverseArrayValidation =
  <A, B, E>(f: (a: A) => TE.TaskEither<ReadonlyArray<E>, B>) =>
  (arr: Array<A>): TE.TaskEither<ReadonlyArray<E>, ReadonlyArray<B>> =>
    pipe(arr, RA.traverse(TE.getApplicativeTaskValidation(task.ApplyPar, RA.getSemigroup<E>()))(f));

export const sequenceArrayValidation: <A, E>(
  arr: Array<TE.TaskEither<ReadonlyArray<E>, A>>,
) => TE.TaskEither<ReadonlyArray<E>, ReadonlyArray<A>> = traverseArrayValidation(identity);

export const run = <E, A>(t: TE.TaskEither<E, A>): Promise<Ei.Either<E, A>> => t();

export const getOrThrow =
  <E>(toThrowable: (e: E) => Error) =>
  <A>(t: TE.TaskEither<E, A>): Promise<A> =>
    t().then(
      Ei.fold(
        (err) => {
          throw toThrowable(err);
        },
        (a) => a,
      ),
    );

export const runUnion: <E, A, B>(
  f: (e: E) => B,
  g: (a: A) => B,
) => (fa: TE.TaskEither<E, A>) => Promise<B> = (f, g) =>
  flow(TE.bimap(f, g), TE.toUnion, (t) => t());

export const exists: <E, A>(
  f: (a: A) => boolean,
) => (fa: TE.TaskEither<E, A>) => Promise<boolean> = (f) => runUnion(constFalse, f);

export const existsLeft: <E, A>(
  f: (e: E) => boolean,
) => (fa: TE.TaskEither<E, A>) => Promise<boolean> = (f) => runUnion(f, constFalse);

export const tryCatch2: <E>(
  onRejected: (reason: unknown) => E,
) => <A>(fa: task.Task<A>) => TE.TaskEither<E, A> = (onRejected) => (fa) =>
  TE.tryCatch(fa, onRejected);

/**
 * Fold over the left and right values using IOs.
 */
export const foldIO = <E, A, B>(
  onLeft: FunctionN<[E], io.IO<B>>,
  onRight: FunctionN<[A], io.IO<B>>,
): FunctionN<[TE.TaskEither<E, A>], task.Task<B>> =>
  flow(TE.chainIOK(onRight), TE.getOrElse(flow(onLeft, task.fromIO)));

export const map2 = eitherT.map2(task.ApplicativePar);

export const bindTaskK = <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => task.Task<B>,
): (<E>(
  ma: TaskEither<E, A>,
) => TaskEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>) =>
  TE.bind(name, (a) => TE.fromTask(f(a)));

export const isRight: <E, A>(fa: TE.TaskEither<E, A>) => Promise<boolean> = task.exists(
  either.isRight,
);

export const toVoid: <E, A>(fa: TE.TaskEither<E, A>) => TE.TaskEither<E, void> = functor.toVoid(
  TE.Functor,
);
