import * as D from 'io-ts/Decoder';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';

/*
 * Decode a TaskEither chain using an io-ts decoder.
 * decodeTE :: Decoder<unknown, O> -> (DecodeError -> E) -> TaskEither<E, I> -> TaskEither<E, O>
 */
export const decode = <I, O, E>(decoder: D.Decoder<unknown, O>, onError: (d: D.DecodeError) => E) => pipe(
    TE.chain<E, I, O>((i) => TE.fromEither(pipe(
        decoder.decode(i),
        E.mapLeft(onError)
    ))));
